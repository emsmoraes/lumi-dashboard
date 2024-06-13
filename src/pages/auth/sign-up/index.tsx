import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImSpinner5 } from "react-icons/im";
import { api } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Campo obrigatório.",
    })
    .min(2, "Campo obrigatório."),
  email: z
    .string({
      required_error: "Campo obrigatório.",
    })
    .trim()
    .min(1, "Campo obrigatório.")
    .email("Email inválido."),

  password: z
    .string({
      required_error: "Digite a sua senha.",
    })
    .min(6, "O campo precisa ter mais de 5 caracters."),
});

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const createUser = async (data: z.infer<typeof formSchema>) => {
    setIsPending(true);
    api
      .post("/users", data)
      .then(() => {
        toast({
          title: "Conta criada com sucesso!",
        });
        navigate("/sign-in", { replace: true });
      })
      .catch(() => {
        toast({
          title: "Error ao criar conta. Tente mais tarde",
        });
        setIsPending(false);
      });
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    createUser(data);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-[500px] laptop:w-[60%]">
        <div className="mb-11 flex flex-col items-center ">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Registro</h1>
          <p className="text-center font-[400] text-gray-400">
            Crie sua conta agora mesmo e aproveite todos os benefícios que temos
            para oferecer!
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormControl>
                    <Input
                      className={`rounded-[4px] border-gray-300 font-inter text-sm font-[400] text-gray-300 focus:border-gray-600 focus:text-gray-600 ${
                        field.value.trim() && "border-gray-600 text-gray-600"
                      }`}
                      placeholder="Digite seu nome completo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormControl>
                    <Input
                      className={`rounded-[4px] border-gray-300 font-inter text-sm font-[400] text-gray-300 focus:border-gray-600 focus:text-gray-600 ${
                        field.value.trim() && "border-gray-600 text-gray-600"
                      }`}
                      placeholder="emailexample@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="relative mb-8">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          className={`rounded-[4px] border-gray-300 font-inter text-sm font-[400] text-gray-300 focus:border-gray-600 focus:text-gray-600 ${
                            field.value.trim() &&
                            "border-gray-600 text-gray-600"
                          }`}
                          placeholder="Digite sua senha"
                          {...field}
                        />
                        <div className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer">
                          {showPassword ? (
                            <IoEyeSharp
                              className="text-gray-300"
                              size={22}
                              onClick={() => setShowPassword(false)}
                            />
                          ) : (
                            <IoEyeOffSharp
                              className="text-gray-300"
                              size={22}
                              onClick={() => setShowPassword(true)}
                            />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-14 flex w-full items-center justify-between">
              <Link
                to="/sign-up"
                className="font-semibold text-primary underline"
              >
                Entrar
              </Link>
            </div>

            <Button className="w-full" variant="default" disabled={isPending}>
              {isPending ? (
                <>
                  <ImSpinner5 className="mr-2 animate-spin" size={20} />
                  <span className="block">Carregando...</span>
                </>
              ) : (
                "Criar"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
