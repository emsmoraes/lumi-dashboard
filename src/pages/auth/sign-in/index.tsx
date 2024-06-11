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
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { authStore } from "@/store/auth.store";
import { useSigninMutation } from "@/mutations/signin.mutation";
import { useToast } from "@/components/ui/use-toast";
import { ImSpinner5 } from "react-icons/im";

const formSchema = z.object({
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

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { authenticate } = authStore();

  const {
    mutateAsync: signin,
    isPending,
    isError,
  } = useSigninMutation({
    onError() {
      toast({
        title: "Error ao efetuar login",
      });

      form.setError("email", {
        message: " ",
      });
      form.setError("password", {
        message: " ",
      });
    },
    onSuccess({ token: { token } }) {
      authenticate(token);
      toast({
        title: "Login efetuado com sucesso!",
      });
      navigate("/home");
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    signin(data);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-[500px] laptop:w-[60%]">
        <div className="mb-11 flex flex-col items-center ">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Login</h1>
          <p className="text-center font-[400] text-gray-400">
            Acesse sua conta fornecendo suas <br /> credenciais de acesso.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
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
              <div className="flex items-center space-x-2">
                <Checkbox
                  className={`rounded-full`}
                  id="keep-logged-in"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked.valueOf() as boolean)
                  }
                />

                <label
                  htmlFor="keep-logged-in"
                  className="text-sm
                 font-[600]
                 leading-none
                 text-gray-600
                 peer-disabled:cursor-not-allowed
                 peer-disabled:opacity-70"
                >
                  Relembre-me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="font-semibold text-primary"
              >
                Esqueceu a senha
              </Link>
            </div>

            <Button
              className="w-full"
              variant="default"
              disabled={isPending && !isError}
            >
              {isPending && !isError ? (
                <>
                  <ImSpinner5 className="mr-2 animate-spin" size={20} />
                  <span className="block">Carregando...</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;
