import { Modal } from "@components/Modals/Modal";
import { Text } from "@components/Texts/Text";
import { BusinessContext } from "@contexts/businessContext";
import { useContext, useState } from "react";

interface Props {
  business: Business;
  onClose: () => void;
}

export default function DeleteBusinessModal({ business, onClose }: Props) {
  const { deleteBusiness } = useContext(BusinessContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteBusiness = async (payload: Business) => {
    setIsLoading(true);
    try {
      await deleteBusiness(payload);
      onClose();
    } catch {}
    setIsLoading(false);
  };

  return (
    <Modal.Root onClose={onClose}>
      <Modal.Header title="Excluir Espaço" />
      <Modal.Body>
        <Text truncate={false}>
          Você tem certeza que deseja excluir o espaço{" "}
          <strong className="text-red-500">{business.name}</strong>?
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Modal.FooterButton onClick={onClose}>cancelar</Modal.FooterButton>
        <Modal.FooterButton
          onClick={() => handleDeleteBusiness(business)}
          dangerous
          isLoading={isLoading}
        >
          excluir
        </Modal.FooterButton>
      </Modal.Footer>
    </Modal.Root>
  );
}
