docker run --rm -it \
--name model_server \
-p 8080:8080 -p 8081:8081 -p 8082:8082 \
-v $(pwd)/model_store:/home/model-server/model-store \
-v $(pwd)/wf_store:/home/model-server/wf-store \
pytorch/torchserve:latest \
torchserve --start --ts-config config.properties --ncs --model-store model-store --workflow-store wf-store --models model=resnet50.mar 