import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

import * as z from 'zod';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TransactionContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal(){
  const createTransaction = useContextSelector(TransactionContext, (context)=>{
    return context.createTransaction
  });

  const {
    control, 
    register, 
    handleSubmit, 
    formState: {isSubmitting},reset} = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues:{
      type: 'income'
    }
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs){
    const { description, category, price, type} = data;

    await createTransaction({
      description,
      category, 
      price,
      type
    })

    reset();
  }

  return(
    <>
      <Dialog.Portal>
        <Overlay/>

        <Content>
          <Dialog.Title>Nova Transação</Dialog.Title>

          <CloseButton>
            <X size={24}/>
          </CloseButton>

          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input 
            type="text" 
            placeholder="Descrição" 
            required
            {...register('description')}
            />
            <input 
            type="text" 
            placeholder="Preço" 
            required
            {...register('price', {valueAsNumber: true})}
            />
            <input 
            type="text" 
            placeholder="Categoria" 
            required
            {...register('category')}
            />
           <Controller
            control={control}
            name="type"
            render={({field})=>{
              return(
                <TransactionType 
                onValueChange={field.onChange} 
                value={field.value}>
                  <TransactionTypeButton variant="income" value="income">
                    Entrada
                    <ArrowCircleUp size={32} color="#00b37e"/>
                  </TransactionTypeButton>
    
                  <TransactionTypeButton variant="outcome" value="outcome">
                    Saída
                    <ArrowCircleDown size={32} color="#f75a68"/>
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
           />
            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
    </Dialog.Portal>
    </>
  );
}