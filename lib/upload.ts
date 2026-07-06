import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

/**
 * 이미지 파일을 Firebase Storage에 업로드
 * @param file 업로드할 파일
 * @param folder 저장할 폴더명 (기본: 'images')
 * @returns 업로드된 이미지의 URL
 */
export async function uploadImage(file: File, folder: string = 'images'): Promise<string> {
  try {
    // 파일명 생성 (타임스탬프 + 원본 파일명)
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const filePath = `${folder}/${fileName}`;

    // Storage 참조 생성
    const storageRef = ref(storage, filePath);

    // 파일 업로드
    const snapshot = await uploadBytes(storageRef, file);

    // 다운로드 URL 가져오기
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw new Error('이미지 업로드에 실패했습니다.');
  }
}

/**
 * 여러 이미지 파일을 한 번에 업로드
 * @param files 업로드할 파일 배열
 * @param folder 저장할 폴더명
 * @returns 업로드된 이미지 URL 배열
 */
export async function uploadMultipleImages(files: File[], folder: string = 'images'): Promise<string[]> {
  try {
    const uploadPromises = files.map(file => uploadImage(file, folder));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('다중 이미지 업로드 실패:', error);
    throw new Error('이미지 업로드에 실패했습니다.');
  }
}
