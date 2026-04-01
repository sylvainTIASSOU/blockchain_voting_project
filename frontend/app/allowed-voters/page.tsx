'use client';
import { useState, useContext, useCallback } from 'react'
import { votingContext } from '@/context/Voter';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

const AllowedVoterPage = () => {
    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, setFormInput] = useState({
        name: '',
        position: '',
        address: '',
    });
    const router = useRouter();
    const {uploadToIPFS} = useContext(votingContext);

    // --------- VOTTERS IMAGE DROP
    const onDrop =  useCallback(async (acceptedFiles: any) => {
        const url = await uploadToIPFS(acceptedFiles[0]);
        setFileUrl(url);
    }, []);
    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        // accept: 'image/*',
        maxSize: 5000000,
    });
  return (
    <div>
        {
            fileUrl && (
                <div>
                    <Image src={fileUrl} alt="voter image" width={100} height={100} className="w-32 h-32" />
                    <div>
                        <p>Name: <span> {formInput.name} </span> </p>
                        <p>Position: <span> {formInput.position} </span> </p>
                        <p>Address: <span> {formInput.address.slice(0, 10) + '...'} </span> </p>
                    </div>
                </div>
            )
        }

        {
            !fileUrl && (
                <div>
                    <div>
                        <h1>Create candidate for voting</h1>
                        <p>
                            Blockchain voting system
                        </p>
                    </div>

                    <div>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </div>

                    <div>
                        <Input type="text" placeholder="Name" value={formInput.name} onChange={(e) => setFormInput({...formInput, name: e.target.value})} />
                        <Input type="text" placeholder="Position" value={formInput.position} onChange={(e) => setFormInput({...formInput, position: e.target.value})} />
                        <Input type="text" placeholder="Address" value={formInput.address} onChange={(e) => setFormInput({...formInput, address: e.target.value})} />
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default AllowedVoterPage