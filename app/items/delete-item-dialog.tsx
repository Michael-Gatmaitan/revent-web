"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import createApolloClient from "@/lib/apollo-client";
import { DELETE_ITEM } from "@/lib/gql";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteItemDialog = ({ item }: { item: Item }) => {
  const router = useRouter();

  const handleDeleteItem = async () => {
    try {
      const client = createApolloClient();
      const { data } = await client.mutate({
        mutation: DELETE_ITEM,
        variables: {
          productID: item.productID,
        },
      });

      console.log(data);
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete the item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteItem}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteItemDialog;
