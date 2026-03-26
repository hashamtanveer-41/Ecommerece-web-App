package com.ecommerce.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService{

    public String uploadImage(String path, MultipartFile file) throws IOException {
        // File names of current/ original file
        String originalFileName = file.getOriginalFilename();
        // Generate a unique file name
        String randomUID = UUID.randomUUID().toString();
        String fileName = randomUID.concat(originalFileName.substring(originalFileName.lastIndexOf(".")));
        String filePath = path + File.separator+ fileName;
        // Check if path exists and create
        File folder = new File(path);
        if (!folder.exists()){
            folder.mkdir();
        }
        // Upload to the server
        Files.copy(file.getInputStream(), Paths.get(filePath));

        return fileName;
    }
}
