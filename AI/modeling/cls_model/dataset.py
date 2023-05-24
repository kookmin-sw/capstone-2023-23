import os 
import json 
import torch

from PIL import Image 
import numpy as np

from torch.utils.data import Dataset
from torchvision import transforms


class Dataset(Dataset):
    def __init__(self, path, mode, transforms=None):
        self.path = path 
        self.mode = mode 
        self.transforms = transforms
        
        with open(os.path.join(self.path,'labels.json'), "r") as st_json:
            labels_json = json.load(st_json)

        self.data = []

        dir_path = os.path.join(path, mode)
        class_path = os.listdir(dir_path)

        for class_name in class_path:
            tmp_list = os.listdir(os.path.join(dir_path,class_name))
            for tmp in tmp_list:
                self.data.append((os.path.join(path,mode,class_name,tmp),labels_json[class_name]))

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        img = Image.open(self.data[idx][0])
        label = self.data[idx][1]

        # 데이터 변형(transform)이 지정되었다면 적용합니다.
        if self.transforms:
            img = self.transforms(img)

        return img, label

