import Link from "next/link";
import { Button, Card, Dropdown, Modal, Table, Tabs } from "flowbite-react";
export default function Sidebar() {
  return (
    <div id="sidebar">
      <div>
        <form id="search-form" role="search">
          <input
            id="q"
            aria-label="Search contacts"
            placeholder="Search"
            type="search"
            name="q"
          />
          <div id="search-spinner" aria-hidden hidden={true} />
          <div className="sr-only" aria-live="polite"></div>
        </form>
      </div>
      <nav>
        <ul>
          <li>
            <a className="active" href={`invoices`}>Invoice</a>
          </li>
          <li>
            <a href={`pnotes`}>Promissory Note</a>
          </li>
          <li>
            <a href={`2`}>Bill Of Exchange</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
