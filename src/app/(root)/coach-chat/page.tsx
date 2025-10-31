"use client";
import Breadcrumbs from "@/components/web/layout/shell/breadcrumbs/breadcrumbs-nav";
import { COACH_CHAT_ROUTE } from "@/lib/constants";
import React from "react";
import ChatContent from "./content";

const Chat = () => {
  const items = [
    { title: "Navigation.overview", href: "#" },
    { title: "Navigation.coachChat", href: COACH_CHAT_ROUTE, isCurrent: true },
  ];

  return (
    <>
      <Breadcrumbs items={items}>
        <ChatContent />
      </Breadcrumbs>
    </>
  );
};

export default Chat;
