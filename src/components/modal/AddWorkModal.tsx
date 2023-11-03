import * as C from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./Form";
import { Wrapper } from "./Wrapper";
import { CgClose } from "react-icons/cg";
import { useForm } from "react-hook-form";
import { newWorkSchema } from "@/schemas";
import { NewWorkData } from "@/interfaces/work.interface";
import { api } from "@/services/axiosClient";
import { toast } from "react-toastify";
import { UserData } from "@/interfaces/user.interface";
import { useModalStateStore } from "@/store";
import { useEffect } from "react";

interface AddWorkModalProps {
  data: UserData;
  mutate: any;
}

export const AddWorkModal = ({ data, mutate }: AddWorkModalProps) => {
  const { toggleAddWorkModalStatus, addWorkModalStatus } = useModalStateStore();

  const addNewWork = async (workData: NewWorkData) => {
    try {
      const response = await api.post("users/works", workData);
      const updatedWorks = [...data.works, response.data];
      const updatedUser = { ...data, works: updatedWorks };

      toast.success("Seu trabalho foi registrado com sucesso");
      mutate(updatedUser, false);
      toggleAddWorkModalStatus();
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewWorkData>({
    resolver: zodResolver(newWorkSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && addWorkModalStatus) {
        toggleAddWorkModalStatus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addWorkModalStatus, toggleAddWorkModalStatus]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(addNewWork)}>
        <div className="flex items-center justify-between">
          <h2 className="title2">Cadastrar Trabalho</h2>
          <C.RoundedButton
            type="button"
            onClick={toggleAddWorkModalStatus}
            aria-label="Botão para fechar o modal"
          >
            <CgClose />
          </C.RoundedButton>
        </div>
        <C.Input
          label="Nome"
          type="text"
          id="name"
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
          placeholder="Digite a descrição do trabalho"
          register={register("description")}
          error={
            errors.description?.message && (
              <C.SpanError>{errors.description.message}</C.SpanError>
            )
          }
        />
        <C.Input
          label="Url do projeto"
          type="text"
          id="deploy_url"
          placeholder="Digite a url do projeto"
          register={register("deploy_url")}
          error={
            errors.deploy_url?.message && (
              <C.SpanError>{errors.deploy_url.message}</C.SpanError>
            )
          }
        />
        <C.Separator />
        <C.LargeButton type="submit">Cadastrar Tecnologia</C.LargeButton>
      </Form>
    </Wrapper>
  );
};
