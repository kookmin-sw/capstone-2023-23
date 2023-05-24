# torch-model-archiver \
# --model-name model \
# --version 1.0 \
# --model-file ./wf_store/model.py \
# --serialized-file ./model_store/densenet161-8d451a50.pth \
# --export-path model_store \
# --handler ./wf_store/custom_handler.py

torch-model-archiver \
--model-name resnet50 \
--version 1.0 \
--model-file ./wf_store/model.py \
--serialized-file ./model_store/resnet50.pth \
--export-path ./model_store \
--handler ./wf_store/custom_handler.py
