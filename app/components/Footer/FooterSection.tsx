import { NavLink } from "@remix-run/react";
import classNames from "classnames";

interface FooterSectionProps {
    id: string
    title: string
    url: string
    items: Record<string, any>
}

export default function FooterSection({ id, title, url, items }: FooterSectionProps) {
    // if (items.length === 0) {
    return (
        <div className={classNames({ 'col-span-2': title.includes('Company') })}>
            <ul>
                <li className="border-b border-primary pb-5 mb-5 bold">
                    <NavLink
                        end
                        key={id}
                        prefetch="intent"
                        // style={activeLinkStyle}
                        to={url}
                        className=""
                    >
                        {title}
                    </NavLink>
                </li>
                {items.map((item: any) => (
                    <li key={item.id}>
                        <NavLink
                            to={item.url}
                            className="text-primary lowercase mb-5"
                        >
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
    // }

}