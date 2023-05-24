import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms
from torch.utils.data import DataLoader

from model import resnet50
from dataset import Dataset

def train(model, params, train_loader, optimizer, loss_function):
    # 모델 학습
    total_step = len(train_loader)
    for epoch in range(params['num_epochs']):
        for i, (images, labels) in enumerate(train_loader):
            images = images.to(device)
            labels = labels.to(device)
            print(images.shape)
            print(labels.shape)
            break

            # 순전파
            outputs = model(images)
            loss = loss_function(outputs, labels)

            # 역전파 및 최적화
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            if (i+1) % 100 == 0:
                print(f'Epoch [{epoch+1}/{num_epochs}], Step [{i+1}/{total_step}], Loss: {loss.item():.4f}')

# # 테스트 데이터셋에 대한 정확도 계산
# def evaluate():
#     model.eval()
#     with torch.no_grad():
#         correct = 0
#         total = 0
#         for images, labels in test_loader:
#             images = images.to(device)
#             labels = labels.to(device)
#             outputs = model(images)
#             _, predicted = torch.max(outputs.data, 1)
#             total += labels.size(0)
#             correct += (predicted == labels).sum().item()

#         print(f'Test Accuracy of the model on the 10000 test images: {(100 * correct / total):.2f}%')


if __name__ == '__main__':
    # device
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    # hyperparamters
    params = {
        "num_epochs" : 2,
        "batch_size" : 1,
        "learning_rate" : 1e-3
    }

    # 데이터셋 불러오기 및 전처리
    transform = transforms.Compose([
        transforms.Resize(128),
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
    ])

    path = './PlantDoc-Dataset'
    mode = 'train'

    train_dataset = Dataset(path, mode, transform)
    train_loader = DataLoader(train_dataset, batch_size=params['batch_size'], shuffle=True, num_workers=2)

    # ResNet 모델 초기화
    model = resnet50(num_classes=1).to(device)

    # 손실 함수와 최적화 알고리즘 설정
    loss_function = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=params['learning_rate'])

    # train
    train(model, params, train_loader, optimizer, loss_function)

