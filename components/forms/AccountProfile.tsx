'use client';

import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthings';
import { updateUser } from '@/lib/actions/user.actions';
import { useRouter, usePathname } from 'next/navigation';

interface Props {
    user: {
        id: string,
        objectId: string,
        username: string,
        name: string,
        bio: string,
        image: string
    };
    btnTitle: string;
  }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AccountProfile = ({user, btnTitle}: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [files, setFiles] = useState<File[]>([]);
    const { startUpload } = useUploadThing("imageUploader");
    const pathname = usePathname();
    const router = useRouter();
  
  const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            username: user?.username ||'',
            name: user?.name ||'',
            bio: user?.bio ||'',
            profile_photo: user?.image ||''
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleImage = (e:ChangeEvent<HTMLInputElement>, fieldChange: (value: string)=> void ) => {
      e.preventDefault();

      const fileReader = new FileReader();

      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];

        setFiles(Array.from(e.target.files));

        if(!file.type.includes('image')) return;

        fileReader.onload = async (event) => {
          const imageDataUrl = event.target?.result?.toString() || '';
          fieldChange(imageDataUrl);
        }
        fileReader.readAsDataURL(file);
        }
      }
       
    // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const balbo = values.profile_photo;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hasImageChanged = isBase64Image(balbo);

    if (hasImageChanged) {
      const imgRes = await startUpload(files);
      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
  }
    await updateUser({
      userId: user.id,
      username: values.username,
      bio: values.bio,
      name: values.name,
      image: values.profile_photo,
      path: pathname
    });
    if(pathname === '/profile/edit') {
      router.back();
    } else {
      router.push('/');
    }
  };
    return (
        <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-col justify-start gap-10">
          <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem className='flex items-center gap-4'>
                <FormLabel className='account-form_image-lable'>
                  {field.value ? (
                     <Image
                     src={field.value}
                     alt="Profile Photo"
                     width={96}
                     height={96}
                     priority
                     className="rounded-full object-contain" 
                     />
                  ) : (
                    <Image
                    src="/assets/profile.svg"
                    alt="Profile Photo"
                    width={24}
                    height={24}
                    className="object-contain" />
                  )}
                </FormLabel>
                <FormControl className='flex-1 text-base-semibold text-gray-200'>
                  <Input 
                  type='file'
                  accept='image/*'
                  placeholder='Upload a photo'
                  className='account-form_image-input'
                  onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-3 w-full'>
                <FormLabel className='text-base-semibold text-light-2'>
                  Name
                </FormLabel>
                <FormControl>
                  <Input 
                  type='text'
                  className='account-form_input no-focus'
                  {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-3 w-full'>
                <FormLabel className='text-base-semibold text-light-2'>
                  Username
                </FormLabel>
                <FormControl>
                  <Input 
                  type='text'
                  className='account-form_input no-focus'
                  {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-3 w-full'>
                <FormLabel className='text-base-semibold text-light-2'>
                  Bio
                </FormLabel>
                <FormControl>
                  <Textarea 
                  rows={10}
                  className='account-form_input no-focus'
                  {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='bg-primary-500'>Submit</Button>
        </form>
      </Form>
    )
}

export default AccountProfile;