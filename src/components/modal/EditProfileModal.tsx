import * as C from "..";
import { Form } from "./Form";
import { Wrapper } from "./Wrapper";
import { CgClose } from "react-icons/cg";
import { EditUserData, UserData } from "@/interfaces/user.interface";
import { useModalStateStore } from "@/store";
import { api } from "@/services/axiosClient";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "@/schemas";

interface EditProfileModalProps {
  data: UserData;
  mutate: any;
}

export const EditProfileModal = ({ data, mutate }: EditProfileModalProps) => {
  const { toggleEditProfileModalStatus, editProfileModalStatus } =
    useModalStateStore();

  const editProfile = async (profileData: EditUserData) => {
    try {
      const { data } = await api.put(`/profile`, profileData);

      toast.success("Status alterado com sucesso");
      mutate(data);
      toggleEditProfileModalStatus();
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserData>({
    resolver: zodResolver(editProfileSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && editProfileModalStatus) {
        toggleEditProfileModalStatus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editProfileModalStatus, toggleEditProfileModalStatus]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(editProfile)}>
        <div className="flex items-center justify-between">
          <h2 className="title2">Detalhes do Perfil</h2>
          <C.RoundedButton
            type="button"
            onClick={toggleEditProfileModalStatus}
            aria-label="Botão para fechar o modal"
          >
            <CgClose />
          </C.RoundedButton>
        </div>
        <C.Input
          label="Nome"
          type="text"
          id="name"
          placeholder="Digite seu nome"
          defaultValue={data.name}
          register={register("name")}
          error={
            errors.name?.message && (
              <C.SpanError>{errors.name.message}</C.SpanError>
            )
          }
        />
        <C.Input
          label="Contato"
          type="text"
          id="contact"
          placeholder="Opção de contato"
          defaultValue={data.contact}
          register={register("contact")}
          error={
            errors.contact?.message && (
              <C.SpanError>{errors.contact.message}</C.SpanError>
            )
          }
        />
        <C.Separator />
        <C.LargeButton type="submit">Salvar alterações</C.LargeButton>
      </Form>
    </Wrapper>
  );
};
