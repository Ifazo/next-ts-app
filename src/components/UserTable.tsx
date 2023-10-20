'use client'
import { IUser } from "@/types"
import { toast } from "react-hot-toast";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function UserTable() {
    const res = await fetch('http://localhost:3000/api/users', { cache: 'no-cache' })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    // console.log(data)

    const handleEdit = (id: string, user: IUser) => {
        // console.log(`edit ${id}`)
        fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'PATCH',
            cache: 'no-cache',
            body: JSON.stringify({
                ...user,
                role: 'admin'

            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => toast.success(`Updated ${data.name}`))
    }
    const handleDelete = (id: string) => {
        console.log(`delete ${id}`)
        fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'DELETE',
            cache: 'no-cache'
        })
            .then(res => res.json())
            .then(data => toast.success(`Deleted ${data.name}`))
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Add user
                    </button>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Email
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Role
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {data.map((user: IUser) => (
                                        <tr key={user.email}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {user.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.role}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <button
                                                    type="button"
                                                    onClick={() => handleEdit(user.id, user)}
                                                    className="text-indigo-600 hover:text-indigo-900">
                                                    Edit<span className="sr-only">, {user.name}</span>
                                                </button>
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(user.id)}
                                                    className="text-red-600 hover:text-red-900">
                                                    Delete<span className="sr-only">, {user.name}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}