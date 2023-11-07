import * as C from "..";
import { Form } from "./Form";
import { Wrapper } from "./Wrapper";
import { CgClose, CgTrash } from "react-icons/cg";
import { GiConfirmed } from "react-icons/gi";
import { UserData } from "@/interfaces/user.interface";
import { useModalStateStore, useSelectedWorkStore } from "@/store";
import { api } from "@/services/axiosClient";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditWorkData } from "@/interfaces/work.interface";
import { editWorkSchema } from "@/schemas";

interface EditWorkModalProps {
  data: UserData;
  mutate: any;
}

export const EditWorkModal = ({ data, mutate }: EditWorkModalProps) => {
  const { toggleEditWorkModalStatus, editWorkModalStatus } =
    useModalStateStore();
  const { work } = useSelectedWorkStore();
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const editWork = async (workData: EditWorkData) => {
    try {
      const response = await api.put(`users/works/${work!.id}`, workData);
      const updatedWorks = data.works.map((item) => {
        return item.id === work!.id
          ? {
              ...item,
              title: response.data.title,
              description: response.data.description,
            }
          : item;
      });
      const updatedUser = { ...data, works: updatedWorks };

      toast.success("Trabalho atualizado com sucesso");
      mutate(updatedUser);
      toggleEditWorkModalStatus();
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditWorkData>({
    resolver: zodResolver(editWorkSchema),
    mode: "onChange",
  });

  const deleteWork = async () => {
    try {
      await api.delete(`users/works/${work!.id}`);
      const updatedWorks = data.works.filter((item) => item.id !== work!.id);
      const updatedUser = { ...data, works: updatedWorks };

      toast.success("Trabalho deletado com sucesso");
      mutate(updatedUser, false);
      toggleEditWorkModalStatus();
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
      if (e.key === "Escape" && editWorkModalStatus) {
        toggleEditWorkModalStatus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editWorkModalStatus, toggleEditWorkModalStatus]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(editWork)}>
        <div className="flex items-center justify-between">
          <h2 className="title2">Detalhes do trabalho</h2>
          <C.RoundedButton
            type="button"
            onClick={toggleEditWorkModalStatus}
            aria-label="Botão para fechar o modal"
          >
            <CgClose />
          </C.RoundedButton>
        </div>
        <C.Input
          label="Nome"
          type="text"
          id="name"
          defaultValue={work!.title}
          placeholder="Digite o nome do trabalho"
          register={register("title")}
          error={
            errors.title?.message && (
              <C.SpanError>{errors.title.message}</C.SpanError>
            )
          }
        />
        <C.Input
          label="Descrição"
          type="text"
          id="description"
          defaultValue={work!.description}
          placeholder="Digite a descrição do trabalho"
          register={register("description")}
          error={
            errors.description?.message && (
              <C.SpanError>{errors.description.message}</C.SpanError>
            )
          }
        />
        <span>Criado em: {formatDate(work!.created_at)}</span>
        <C.Separator />
        <div className="flex justify-between">
          <C.LargeButton type="submit">Salvar alterações</C.LargeButton>
          <button
            data-confirmdelete={confirmDelete}
            className="mt-auto h-10 rounded-md border-none bg-delete50 px-5 text-xl font-medium text-white transition-colors hover:bg-delete100 data-[confirmdelete=true]:bg-confirmDelete50 hover:data-[confirmdelete=true]:bg-confirmDelete100"
            type="button"
            onClick={() => (confirmDelete ? deleteWork() : handleDeleteClick())}
            aria-label="Exclua a tecnologia selecionada"
          >
            {confirmDelete ? <GiConfirmed /> : <CgTrash />}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
