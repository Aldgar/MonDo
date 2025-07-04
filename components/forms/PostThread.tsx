/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
'use client';

import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useRouter, usePathname } from 'next/navigation';
import { ThreadValidation } from '@/lib/validations/thread';
import { createThread } from '@/lib/actions/thread.action';
//import { updateUser } from '@/lib/actions/user.actions';

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


function PostThread ({ userId}: { userId: string }) {
    const pathname = usePathname();
    const router = useRouter();
  
  const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: '',
            accountId: userId,

        }
    });

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({
            text: values.thread,
            author: userId, 
            communityId: '', 
            path: pathname,
        });

        router.push("/");
    };
    return ( 
    
        <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="mt-10 flex flex-col justify-start gap-10"
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-3 w-full'>
                <FormLabel className='text-base-semibold text-light-2'>
                  Content:
                </FormLabel>
                <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                  <Textarea 
                    rows={15}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='bg-cyan-600'>Post Thought</Button>
        </form>
      </Form>
        )
}

export default PostThread;