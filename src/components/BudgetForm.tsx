import { useMemo, useState } from 'react'
import { useBudget } from '../hooks/useBudget'

export const BudgetForm = () => {
    const [budget, setBudget] = useState(0)
    const { dispatch } = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'add-budget', payload: { budget } })
    }

    return (
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-purple-heart-600 font-bold text-center">
                    Definir Presupuesto
                </label>
                <input
                    id="budgetID"
                    type="number"
                    className="w-full bg-purple-heart-100 border border-electric-violet-900 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                value="Definir Presupuesto"
                className="bg-purple-heart-600 hover:bg-purple-heart-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    )
}
