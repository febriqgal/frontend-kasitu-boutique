import { Product } from "@/app/_types/products";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useDeleteProductMutation } from "../_redux/feature/productsSlice";

export default function ModalDeleteProduct({
  dataProduct,
}: {
  dataProduct: Product;
}) {
  const [deleteProduct] = useDeleteProductMutation();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button size="sm" color="primary" onPress={onOpen}>
        Hapus
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`Delete ${dataProduct.title}?`}
              </ModalHeader>
              <ModalBody>
                <p>Apakah anda yakin ingin menghapus produk ini?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button
                  color="danger"
                  onPress={() => deleteProduct(dataProduct.id)}
                >
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
