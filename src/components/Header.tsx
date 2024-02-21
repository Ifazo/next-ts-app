'use client'
import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
    MenuIcon,
    SearchIcon,
    UserIcon,
    XIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "@/store/hook";
import { setUser } from "@/store/features/user/userSlice";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

const navigation = {
    categories: [
        {
            id: "1",
            name: "Service",
            featured: [
                {
                    name: "New Arrivals",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
                    imageAlt:
                        "Models sitting back to back, wearing Basic Tee in black and bone.",
                },
                {
                    name: "Basic Tees",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
                    imageAlt:
                        "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
                },
                {
                    name: "Accessories",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg",
                    imageAlt:
                        "Model wearing minimalist watch with black wristband and white watch face.",
                },
            ],
        },
        {
            id: "2",
            name: "Category",
            featured: [
                {
                    name: "Accessories",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg",
                    imageAlt:
                        "Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters.",
                },
                {
                    name: "New Arrivals",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
                    imageAlt:
                        "Drawstring top with elastic loop closure and textured interior padding.",
                },
                {
                    name: "Artwork Tees",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
                    imageAlt:
                        "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
                },
            ],
        },
    ],
    pages: [
        { name: "Service", href: "/service" },
        { name: "Blog", href: "/blog" },
        { name: "Dashboard", href: "/dashboard" },
    ],
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Header({ session }: { session: Session | null }) {

    const [open, setOpen] = useState(false);
    // console.log('Welcome', session?.user.name)
    const dispatch = useAppDispatch()
    dispatch(setUser(session))

    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 flex z-40 lg:hidden"
                    onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full">
                        <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                            <div className="px-4 pt-5 pb-2 flex">
                                <button
                                    type="button"
                                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                                    onClick={() => setOpen(false)}>
                                    <span className="sr-only">Close menu</span>
                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Links */}
                            <Tab.Group as="div" className="mt-2">
                                <div className="border-b border-gray-200">
                                    <Tab.List className="-mb-px flex px-4 space-x-8">
                                        {navigation.categories.map((category) => (
                                            <Tab
                                                key={category.name}
                                                className={({ selected }) =>
                                                    classNames(
                                                        selected
                                                            ? "text-indigo-600 border-indigo-600"
                                                            : "text-gray-900 border-transparent",
                                                        "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                                                    )
                                                }>
                                                {category.name}
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                </div>
                                <Tab.Panels as={Fragment}>
                                    {navigation.categories.map((category) => (
                                        <Tab.Panel
                                            key={category.name}
                                            className="pt-10 pb-8 px-4 space-y-10">
                                            <div className="space-y-4">
                                                {category.featured.map((item, itemIdx) => (
                                                    <div
                                                        key={itemIdx}
                                                        className="group relative aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden">
                                                        <Image
                                                            layout="fill"
                                                            src={item.imageSrc}
                                                            alt={item.imageAlt}
                                                            className="object-center object-cover group-hover:opacity-75"
                                                        />
                                                        <div className="flex flex-col justify-end">
                                                            <div className="p-4 bg-white bg-opacity-60 text-base sm:text-sm">
                                                                <a
                                                                    href={item.href}
                                                                    className="font-medium text-gray-900">
                                                                    <span
                                                                        className="absolute inset-0"
                                                                        aria-hidden="true"
                                                                    />
                                                                    {item.name}
                                                                </a>
                                                                <p
                                                                    aria-hidden="true"
                                                                    className="mt-0.5 text-gray-700 sm:mt-1">
                                                                    Shop now
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </Tab.Panel>
                                    ))}
                                </Tab.Panels>
                            </Tab.Group>

                            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                {navigation.pages.map((page) => (
                                    <div key={page.name} className="flow-root">
                                        <a
                                            href={page.href}
                                            className="-m-2 p-2 block font-medium text-gray-900">
                                            {page.name}
                                        </a>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 py-6 px-4">
                                <Link
                                    href="/dashboard"
                                    className="-m-2 p-2 flex items-center">
                                    <Image
                                        width={20}
                                        height={20}
                                        src="https://tailwindui.com/img/flags/flag-canada.svg"
                                        alt=""
                                        className="w-5 h-auto block flex-shrink-0"
                                    />
                                    <span className="ml-3 block text-base font-medium text-gray-900">
                                        Dashboard
                                    </span>
                                    <span className="sr-only">dashboard</span>
                                </Link>
                            </div>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>
            {/* Header */}
            <header className="relative bg-white">
                <nav
                    aria-label="Top"
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="h-16 flex items-center justify-between">
                            <div className="flex-1 flex items-center lg:hidden">
                                <button
                                    type="button"
                                    className="-ml-2 bg-white p-2 rounded-md text-gray-400"
                                    onClick={() => setOpen(true)}>
                                    <span className="sr-only">Open menu</span>
                                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:flex-1 lg:block lg:self-stretch">
                                <div className="h-full flex space-x-8">
                                    {navigation.pages.map((page) => (
                                        <a
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                                            {page.name}
                                        </a>
                                    ))}
                                </div>
                            </Popover.Group>

                            {/* Logo */}
                            <Link href="/" className="flex">
                                <span className="sr-only">Workflow</span>
                                <Image
                                    width={64}
                                    height={64}
                                    className="h-16 w-auto"
                                    src='next.svg'
                                    alt="logo"
                                />
                            </Link>

                            <div className="flex-1 flex items-center justify-end">

                                {/* Auth */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    {session?.user
                                        ? (<button
                                            type="button"
                                            onClick={() => {
                                                signOut()
                                                dispatch(setUser(null))
                                                toast.success('Signed out successfully')
                                            }}
                                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Sign Out
                                        </button>)
                                        : (<Link
                                            href="/auth/signin"
                                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Sign In
                                        </Link>)}
                                </div>

                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}