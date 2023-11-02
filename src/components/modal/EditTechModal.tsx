import * as C from "..";
import { Form } from "./Form";
import { Wrapper } from "./Wrapper";
import { CgClose, CgTrash } from "react-icons/cg";
import { GiConfirmed } from "react-icons/gi";
import { UserData } from "@/interfaces/user.interface";
import { useModalStateStore, useSelectedTechStore } from "@/store";
import { api } from "@/services/axiosClient";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { EditTechData } from "@/interfaces/tech.interface";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTechSchema } from "@/schemas";

interface EditTechModalProps {
  data: UserData;
  mutate: any;
}

export const EditTechModal = ({ data, mutate }: EditTechModalProps) => {
  const { toggleEditModalStatus, editModalStatus } = useModalStateStore();
  const { tech } = useSelectedTechStore();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const editTech = async (techData: EditTechData) => {
    try {
      const response = await api.put(`users/techs/${tech!.id}`, techData);
      const updatedTechs = data.techs.map((item) => {
        return item.id === tech!.id
          ? { ...item, status: response.data.status }
          : item;
      });
      const updatedUser = { ...data, techs: updatedTechs };

      toast.success("Status alterado com sucesso");
      mutate(updatedUser);
      toggleEditModalStatus();
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTechData>({
    resolver: zodResolver(editTechSchema),
    mode: "onChange",
  });

  const deleteTech = async () => {
    try {
      await api.delete(`users/techs/${tech!.id}`);
      const updatedTechs = data.techs.filter((item) => item.id !== tech!.id);
      const updatedUser = { ...data, techs: updatedTechs };

      toast.success("Tecnologia deletada com sucesso");
      mutate(updatedUser, false);
      toggleEditModalStatus();
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const year = newDate.getFullYear();
    return day + "/" + month + "/" + year;
  };

  const handleDeleteClick = () => {
    setConfirmDelete(true);

    setTimeout(() => setConfirmDelete(false), 3000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && editModalStatus) {
        toggleEditModalStatus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editModalStatus, toggleEditModalStatus]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(editTech)}>
        <div className="flex items-center justify-between">
          <h2 className="title2">Detalhes da tecnologia</h2>
          <C.RoundedButton
            type="button"
            onClick={toggleEditModalStatus}
            aria-label="Botão para fechar o modal"
          >
            <CgClose />
          </C.RoundedButton>
        </div>
        <C.Input
          label="Nome"
          type="text"
          id="name"
          placeholder="Digite o nome da tecnologia"
          defaultValue={tech!.title}
          disabled
        />
        <C.Select
          label="Modificar status"
          id="status"
          defaultValue={tech!.status}
          register={register("status")}
          error={
            errors.status?.message && (
              <C.SpanError>{errors.status.message}</C.SpanError>
            )
          }
        >
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </C.Select>
        <span>Criado em: {formatDate(tech!.created_at)}</span>
        <C.Separator />
        <div className="flex justify-between">
          <C.LargeButton type="submit">Salvar alterações</C.LargeButton>
          <button
            data-confirmDelete={confirmDelete}
            className="data-[confirmDelete=true]:bg-confirmDelete50 hover:data-[confirmDelete=true]:bg-confirmDelete100 mt-auto h-10 rounded-md border-none bg-delete50 px-5 text-xl font-medium text-white transition-colors hover:bg-delete100"
            type="button"
            onClick={() => (confirmDelete ? deleteTech() : handleDeleteClick())}
            aria-label="Exclua a tecnologia selecionada"
          >
            {confirmDelete ? <GiConfirmed /> : <CgTrash />}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
