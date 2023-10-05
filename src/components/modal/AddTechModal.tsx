import * as C from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./Form";
import { Wrapper } from "./Wrapper";
import { CgClose } from "react-icons/cg";
import { useForm } from "react-hook-form";
import { newTechSchema } from "@/schemas";
import { NewTechData } from "@/interfaces/tech.interface";
import { api } from "@/services/axiosClient";
import { toast } from "react-toastify";
import { UserData } from "@/interfaces/user.interface";
import { useModalStateStore } from "@/store";
import { useEffect } from "react";

interface AddTechModalProps {
  data: UserData;
  mutate: any;
}

export const AddTechModal = ({ data, mutate }: AddTechModalProps) => {
  const { toggleAddModalStatus, addModalStatus } = useModalStateStore();

  const addNewTech = async (techData: NewTechData) => {
    try {
      const response = await api.post("users/techs", techData);
      const updatedTechs = [...data.techs, response.data];
      const updatedUser = { ...data, techs: updatedTechs };

      toast.success("Sua tecnologia foi registrada com sucesso");
      mutate(updatedUser, false);
      toggleAddModalStatus();
    } catch (error) {
      console.error(error);
      toast.error("Você já registrou essa tecnologia anteriormente");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTechData>({
    resolver: zodResolver(newTechSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && addModalStatus) {
        toggleAddModalStatus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addModalStatus, toggleAddModalStatus]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(addNewTech)}>
        <div className="flex justify-between items-center">
          <h2 className="title2">Cadastrar Tecnologia</h2>
          <C.RoundedButton
            type="button"
            onClick={toggleAddModalStatus}
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
          register={register("title")}
          error={
            errors.title?.message && (
              <C.SpanError>{errors.title.message}</C.SpanError>
            )
          }
        />
        <C.Select
          label="Selecionar status"
          id="status"
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
        <C.Separator />
        <C.LargeButton type="submit">Cadastrar Tecnologia</C.LargeButton>
      </Form>
    </Wrapper>
  );
};
