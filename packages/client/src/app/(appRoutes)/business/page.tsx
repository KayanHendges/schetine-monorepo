"use client";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BusinessContext } from "@contexts/businessContext";
import { Table } from "@components/Tables/Table";
import { TableColum } from "@components/Tables/Table/types";
import { ProfessionalContext } from "@contexts/professionalContext";
import PopUpOptions from "@components/PopUps/PopUpOptions";
import { AssignedBusinessSearchForm } from "@components/Forms/Business/AssignedBusinessSearch";
import { handleSubmit } from "@utils/form";
import { assignedBusinessSearchFormSchema } from "@components/Forms/Business/AssignedBusinessSearch/BussinessSearchForm";
import ButtonBox from "@components/Buttons/Box";
import { DotsThreeVertical } from "phosphor-react";
import OptionItem from "@components/Items/OptionItem";
import DeleteBusinessModal from "src/app/(appRoutes)/business/DeleteBusinessModal";
import { HelperBarContext } from "@contexts/helperBarContext";
import { UpdateBusinessForm } from "@components/Forms/Business/UpdateBusiness";

export default function Appointments() {
  const { assignedBusiness, updateBusiness } = useContext(BusinessContext);
  const { initCustomHelper, closeCustomHelper } = useContext(HelperBarContext);
  const { professional } = useContext(ProfessionalContext);
  const [businessToDelete, setBusinessToDelete] = useState<Business | null>(
    null
  );
  const [filteredBusiness, setFilteredBusiness] = useState<Business[]>([]);

  const handleUpdateBusiness = useCallback(
    async (id: string, business: IUpdateBusinessForm) => {
      try {
        await updateBusiness(id, business);
        closeCustomHelper();
      } catch (error) {}
    },
    [closeCustomHelper, updateBusiness]
  );

  const searchForm = useForm<IAssignedBusinessSearchForm>({
    resolver: joiResolver(assignedBusinessSearchFormSchema),
  });

  const filterBusiness = useCallback(async () => {
    try {
      const { name } = await handleSubmit(searchForm);

      setFilteredBusiness(
        assignedBusiness?.filter((business) =>
          business.name.toLowerCase().includes(name?.toLowerCase() || "")
        ) || []
      );
    } catch (error) {}
  }, [assignedBusiness, searchForm]);

  const [openOptionIndex, setOpenOptionIndex] = useState<number | null>(null);

  const handleOwnerName = useCallback(
    (business: AssignedBusiness) => {
      const isOnwer = professional?.id === business.owner.id;
      return isOnwer ? "você" : business?.owner?.name;
    },
    [professional?.id]
  );

  const OptionsButton = useCallback(
    (business: Business, rowIndex: number) => {
      const matchIndex = rowIndex === openOptionIndex;
      return (
        <div className="relative">
          <ButtonBox
            onClick={() => setOpenOptionIndex(matchIndex ? null : rowIndex)}
          >
            <DotsThreeVertical />
          </ButtonBox>
          {matchIndex && (
            <PopUpOptions
              close={() => setOpenOptionIndex(null)}
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
                        setOpenOptionIndex(null);
                      }}
                    >
                      excluir
                    </OptionItem>
                  ),
                },
              ]}
            />
          )}
        </div>
      );
    },
    [closeCustomHelper, handleUpdateBusiness, initCustomHelper, openOptionIndex]
  );

  const columns: TableColum<Business>[] = useMemo(
    () => [
      {
        label: "nome",
        dataKey: "name",
      },
      { label: "dono", render: handleOwnerName },
      { label: "criado", dataKey: "created" },
      {
        label: "",
        dataKey: "id",
        className: "flex-none w-16",
        render: OptionsButton,
      },
    ],
    [handleOwnerName, OptionsButton]
  );

  useEffect(() => {
    filterBusiness();
  }, [filterBusiness, assignedBusiness]);

  return (
    <div className={clsx("flex w-full h-full flex-col gap-4 p-4")}>
      <AssignedBusinessSearchForm
        onSubmit={filterBusiness}
        formHook={searchForm}
      />
      {businessToDelete && (
        <DeleteBusinessModal
          business={businessToDelete}
          onClose={() => setBusinessToDelete(null)}
        />
      )}
      <Table.Root>
        <Table.Header columns={columns} />
        <Table.Body
          columns={columns}
          dataSource={filteredBusiness}
          identifierKey="id"
        />
      </Table.Root>
    </div>
  );
}
