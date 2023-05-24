import torch
import torchvision
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
from torchvision.models.detection.mask_rcnn import MaskRCNNPredictor

def mask_rcnn(num_classes):
    hidden_layer = 64

    # --------------- create model ---------------
    model = torchvision.models.detection.maskrcnn_resnet50_fpn(weight=torchvision.models.detection.MaskRCNN_ResNet50_FPN_Weights.DEFAULT)

    # roi cls head 
    in_features = model.roi_heads.box_predictor.cls_score.in_features
    model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes)

    # roi mask head
    in_features_mask = model.roi_heads.mask_predictor.conv5_mask.in_channels
    model.roi_heads.mask_predictor = MaskRCNNPredictor(in_features_mask, hidden_layer, num_classes)
    
    return model