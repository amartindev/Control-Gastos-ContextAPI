import { v4 as uuidv4 } from 'uuid'
import { DraftExpense, Expense } from '../types'

export type BudgetActions =
    | { type: 'add-budget'; payload: { budget: number } }
    | { type: 'show-modal' }
    | { type: 'close-modal' }
    | { type: 'add-expense'; payload: { expense: DraftExpense } }
    | { type: 'remove-expense'; payload: { id: Expense['id'] } }
    | { type: 'get-expense-by-id'; payload: { id: Expense['id'] } }
    | { type: 'update-expense'; payload: { expense: Expense } }
    | { type: 'reset-app'}

export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
}

const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: [],
    editingId: '',
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4(),
    }
}

export const BudgetReducer = (state: BudgetState = initialState, action: BudgetActions) => {
    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget,
        }
    }
    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true,
        }
    }
    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: '',
        }
    }
    if (action.type === 'add-expense') {
        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false,
        }
    }
    if (action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter((expense) => expense.id !== action.payload.id),
        }
    }
    if (action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true,
        }
    }
    if (action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map((expense) =>
                expense.id === action.payload.expense.id ? action.payload.expense : expense
            ),
            modal: false,
            editingId: '',
        }
    }

    if (action.type === 'reset-app') {
        return {
            ...state,
            budget: 0,
            expenses: []
        }
    }

    return state
}