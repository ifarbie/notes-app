import { formatDate } from '@/utils/functions';
import { Link } from '@chakra-ui/next-js';
import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';

type Props = {
  id: number;
  title: string;
  createdAt: string;
  body: string;
};

export default function NotesCard({ id, title, createdAt, body }: Props) {
  return (
    <Card textColor={'#d5f5ff'} variant={'outline'} background={'transparent'} rounded={'2xl'} borderColor={'#36b9ff'}>
      <Link href={`/notes/${id}`}>
        <CardHeader>
          <Heading fontSize={'2xl'} noOfLines={2}>{title}</Heading>
          <Text textColor={'#36b9ff'} fontSize={'xs'}>{formatDate(Number(createdAt))}</Text>
        </CardHeader>
        <CardBody>
          <Text noOfLines={3} fontSize={'lg'}>{body}</Text>
        </CardBody>
      </Link>
    </Card>
  );
}
