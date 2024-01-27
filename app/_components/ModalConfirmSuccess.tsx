import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";
import { AppConfig } from "../_constants/AppConfig";
import { Order } from "../_types/order";

export default function ModalConfirmSuccess({
  dataOrder,
}: {
  dataOrder: Order;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button size="sm" color="primary" onPress={onOpen}>
        Barang diterima
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Konfirmasi
              </ModalHeader>
              <ModalBody>
                <p>{`Apakah anda yakin barang ${dataOrder.title} sudah diterima?`}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={async () => {
                    await axios.patch(
                      `${AppConfig.apiURL}/order/${dataOrder.id}`,
                      {
                        status: "success",
                      }
                    );
                    toast.success("Berhasil mengubah status");
                    onClose();
                  }}
                >
                  Terima
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
