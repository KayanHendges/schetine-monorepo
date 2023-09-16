import ButtonBox from "@components/Buttons/Box";
import { UpdateBusinessForm } from "@components/Forms/Business/UpdateBusiness";
import OptionItem from "@components/Items/OptionItem";
import PopUpOptions from "@components/PopUps/PopUpOptions";
import { BusinessContext } from "@contexts/businessContext";
import { HelperBarContext } from "@contexts/helperBarContext";
import { DotsThreeVertical } from "phosphor-react";
import { useCallback, useContext, useState } from "react";
import DeleteBusinessModal from "src/app/(appRoutes)/business/DeleteBusinessModal";

interface Props {
  business: Business;
}

function OptionsButton({ business }: Props) {
  const { initCustomHelper, closeCustomHelper } = useContext(HelperBarContext);
  const { updateBusiness } = useContext(BusinessContext);
  const [businessToDelete, setBusinessToDelete] = useState<Business | null>(
    null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleUpdateBusiness = useCallback(
    async (id: string, business: IUpdateBusinessForm) => {
      try {
        await updateBusiness(id, business);
        closeCustomHelper();
      } catch (error) {}
    },
    [closeCustomHelper, updateBusiness]
  );

  return (
    <div className="relative">
      <ButtonBox onClick={() => setIsOpen(true)}>
        <DotsThreeVertical />
      </ButtonBox>
      {isOpen && (
        <PopUpOptions
          close={() => setIsOpen(false)}
          options={[
            {
              label: "editar",
              action: () =>
                initCustomHelper(
                  <UpdateBusinessForm
                    business={{ name: business.name }}
                    onSuccess={(payload) =>
                      handleUpdateBusiness(business.id, payload)
                    }
                  />
                ),
            },
            {
              render: (
                <OptionItem
                  key={"delete-button"}
                  className={"hover:bg-red-500"}
                  onClick={() => {
                    setBusinessToDelete(business);
                    closeCustomHelper();
                    setIsOpen(false);
                  }}
                >
                  excluir
                </OptionItem>
              ),
            },
          ]}
        />
      )}
      {businessToDelete && (
        <DeleteBusinessModal
          business={businessToDelete}
          onClose={() => setBusinessToDelete(null)}
        />
      )}
    </div>
  );
}

export default OptionsButton;
