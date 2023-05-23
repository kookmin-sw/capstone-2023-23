import torch
from torchvision import transforms
from torch.autograd import Variable
from PIL import Image
from model import resnet50
import os
import io


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

    def preprocess(self, data):
        image_data = data[0].get('body')
        image = Image.open(io.BytesIO(image_data))
        image = self.transforms(image)
        image = Variable(image, requires_grad=True)
        image = image.unsqueeze(0)
        return image

    def inference(self, image):
        image = image.to(self.device)
        print('start inference')
        output = self.model(image)
        print('finish inference')
        return output

    def postprocess(self, output):
        _, predicted = torch.max(output.data, 1)
        return predicted.item()

    def handle(self, data, context):
        image = self.preprocess(data)
        output = self.inference(image)
        print(f'result : {output}')
        predicted = self.postprocess(output)
        return [predicted]
