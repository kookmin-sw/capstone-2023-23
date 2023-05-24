import os
import io
import numpy as np
import json
import requests
from PIL import Image

import torch
from torchvision import transforms
from torch.autograd import Variable

from model import resnet50, mask_rcnn
from utils import decode_output

class CustomHandler(object):
    def __init__(self):
        self.model = None
        self.device = None
        self.transforms = transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])

    def initialize(self, context):
        properties = context.system_properties
        model_dir = properties.get("model_dir")
        self.device = torch.device('cpu')

        self.model = resnet50()
        self.model.load_state_dict(torch.load(os.path.join(model_dir, 'resnet50.pth'), map_location=self.device))
        self.model.eval()

        self.od_model = mask_rcnn(1)

    def preprocess(self, data):
        image_data = data[0].get('file')
        
        image = np.array(Image.open(io.BytesIO(image_data)))
        if image.shape[2] == 4: 
            image = np.array(image)[:,:,:3]
        image = Image.fromarray(image)

        image = self.transforms(image)
        image = Variable(image, requires_grad=True)
        image = image.unsqueeze(0)
        return image

    def inference_cls(self, image):
        image = image.to(self.device)
        print('start inference')
        output = self.model(image)
        print('finish inference')
        return output
    
    def inference_od(self, image):
        image = image.to(self.device) 
    
        outputs = self.od_model(image)
            
        for idx, output in enumerate(outputs):
            bbs, confs, labels, masks = decode_output(output)

        cropped_img = []
        for x, y, w, h in bbs: 
            cropped_img.append(image[y: y + h, x: x + w])
        return cropped_img


    def postprocess(self, output):
        _, predicted = torch.max(output.data, 1)
        return predicted.item()
    
    def send_push_notification(self):
        url = "https://exp.host/--/api/v2/push/send"

        headers = {
            "Content-Type": "application/json"
        }

        data = {
            "to": "ExponentPushToken[ugDSnMGW3tJoRlf1P_bPRM]",
            "title": "초록이 이상탐지",
            "body": "당신의 식물에 질병이 탐지됐습니다"
        }

        response = requests.post(url, headers=headers, data=json.dumps(data))

        return response

    def handle(self, data, context):
        image = self.preprocess(data)

        output = self.inference_od(image)
        print(f'result : {output}')

        output = self.inference_cls(output)
        
        predicted = self.postprocess(output)

        if predicted > 0.7:
            self.send_push_notification()


