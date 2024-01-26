
export type TUserForm = {
    email:string;
    password:string
}

export type TServerAction<FormData, Responce> =(e:FormData)=>Promise<Responce>

export type TOnLoginUserParams<FormData> = {
    validator?: (e:FormData)=>boolean;
    onSuccess?:(data:any)=>void;
    onLoading?:(e:boolean)=>void;
    onError?:(message:string)=>void;
}

export const MESSAGE = {
    EMPTY_FORM:"Veiller remplire tous le champs",
    ERROR_CONNEXION:"Erreur de connexion, Veuiller reesayer!"
}

export const isValideForm = ({email, password}:TUserForm):boolean=>{
    return !(!email.trim() || !password.trim())
}

export function onSubmitForm<FormData, Responce=any>(formData:FormData,serverAction:TServerAction<FormData, Responce>, params: TOnLoginUserParams<FormData>) {
    return async ()=>{
        params.onLoading?.(true)
        if(params.validator?.(formData)){
            serverAction(formData)
            .then(params.onSuccess)
            .catch(()=>params.onError?.(MESSAGE.ERROR_CONNEXION))
            .finally(()=>params.onLoading?.(false))
        }else{
            params.onError?.(MESSAGE.EMPTY_FORM)
            params.onLoading?.(false)
        }

    }
}



// use case
export const loginUser = async (e: any)=>{
    // throw Error("Error server")
    return { success:true, data:{}}
}

const handlerLoginUser = onSubmitForm<TUserForm>(
    { email: "", password: "yuue" }, // data form
    (form) => loginUser(form), // apis action server
    {
      validator(e) {
        // validator ici
        return isValideForm(e);
      },
      onLoading(isloading) {
        // is loading ici
        // tu peux changer de state
        console.log("onLoading ", isloading);
      },
      onSuccess(data) {
        // reponce quand c'est reussi
        console.log("onSuccess ", data);
      },
      onError(message) {
        // set message error ici
        console.log("onError ", message);
      },
    }
  );

  //dans le componsent
  handlerLoginUser()
