package com.example.capstone.service.datain;

import com.example.capstone.entity.ImageStorageEntity;
import com.example.capstone.repository.ImageRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;

@Service
@Getter
@Setter
@AllArgsConstructor
public class ImageInService {
    private ImageRepository imageRepository;

    public String ImageSave(MultipartFile file, int deviceID){
        LocalDateTime dataTime = LocalDateTime.now();
        int device_ID = deviceID;
        String fileName = file.getOriginalFilename();
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1);

        String path = "/home/ubuntu/Image/"+device_ID +".jpg";
///home/ubuntu/Image/
//        /Users/junghyun/Desktop/CapstoneProject/Capstone/src/main/resources/Image/
        try {

            File dest = new File(path);
            file.transferTo(dest);
            imageRepository.save(new ImageStorageEntity(path , device_ID));
            String date = LocalDateTime.now().toString();
            uploadImageToS3("capstoneimage",device_ID+"/"+date,path);

            return "Image save Success";

        } catch (IOException e) {
            e.printStackTrace();
            return "Image save Fail";
        }
    }
    public void uploadImageToS3(String bucketName, String newKey, String filePath) {
        // S3 클라이언트 생성
        S3Client s3Client = S3Client.builder()
                .region(Region.AP_NORTHEAST_2) // 원하는 리전으로 변경
                .build();

        // 업로드할 파일 생성
        File file = new File(filePath);

        try {
            // S3에 객체 업로드 요청 생성
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(newKey) // 변경된 파일 이름으로 설정
                    .build();

            // 파일을 S3에 업로드
            PutObjectResponse response = s3Client.putObject(putObjectRequest, RequestBody.fromFile(file));

            System.out.println("이미지를 S3에 성공적으로 업로드했습니다. ETag: " + response.eTag());

        } catch (S3Exception e) {
            System.err.println("S3 업로드 중 오류가 발생했습니다.");
            e.printStackTrace();
        }
    }


}

