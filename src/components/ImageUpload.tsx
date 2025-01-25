'use client'

import React, { useRef, ChangeEvent } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import { useSetRecoilState } from 'recoil';
import { createPostImageAtom } from '@/store/atoms/createPostImageAtom';

export default function ImageUpload() {
  const setImage = useSetRecoilState(createPostImageAtom);
  const fileInputRef = useRef<HTMLInputElement|null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: any) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}><FontAwesomeIcon icon={faImage} style={{color: 'white'}} size="lg"/></button>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}


