import torch
import numpy as np
from torchvision.ops import nms

def decode_output(output):
    'convert tensors to numpy arrays'
    bbs = output['boxes'].cpu().detach().numpy().astype(np.uint16) # output의 bounding box
    labels = np.array([i for i in output['labels'].cpu().detach().numpy()])
    confs = output['scores'].cpu().detach().numpy() # output bounding box 의 confidence score
    masks = output['masks'].cpu().detach().numpy()

    ixs = nms(torch.tensor(bbs.astype(np.float32)), torch.tensor(confs), 0.3) # nms 수행

    bbs, confs, labels, masks = [tensor[ixs] for tensor in [bbs, confs, labels, masks]]

    if len(ixs) == 1:
        bbs, confs, labels, masks = [np.array([tensor]) for tensor in [bbs, confs, labels, masks]]
    return bbs.tolist(), confs.tolist(), labels.tolist(), masks