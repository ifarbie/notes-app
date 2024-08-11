import { Link } from '@chakra-ui/next-js';
import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';

type Props = {
  id: number;
};

export default function NotesCard({ id }: Props) {
  return (
    <Card>
      <Link href={'/notes/1'}>
        <CardHeader>
          <Heading>Notes Title</Heading>
          <Text>2023.10.09</Text>
        </CardHeader>
        <CardBody>
          <Text noOfLines={2}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit saepe, deleniti delectus, quod quaerat nobis iure enim nihil accusantium quas quos accusamus, fugiat facere maiores?</Text>
        </CardBody>
      </Link>
    </Card>
  );
}
