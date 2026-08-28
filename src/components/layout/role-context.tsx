"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ERPRole = "principal" | "teacher" | "accountant" | "hr" | "parent" | "student";

interface RoleContextType {
  role: ERPRole;
  setRole: (role: ERPRole) => void;
  roleDetails: {
    name: string;
    title: string;
    avatar: string;
  };
}

const ROLE_MAP: Record<ERPRole, { name: string; title: string; avatar: string }> = {
  principal: { name: "Dr. Robert Vance", title: "Principal / Mgmt", avatar: "RV" },
  teacher: { name: "Sarah Jenkins", title: "Senior Teacher (Grade 10)", avatar: "SJ" },
  accountant: { name: "Marcus Brody", title: "Chief Accountant", avatar: "MB" },
  hr: { name: "Elena Rostova", title: "Head of HR", avatar: "ER" },
  parent: { name: "David Miller", title: "Parent (Leo Miller, Grade 9)", avatar: "DM" },
  student: { name: "Leo Miller", title: "Student (Grade 9A)", avatar: "LM" },
};

const RoleContext = createContext<RoleContextType>({
  role: "principal",
  setRole: () => {},
  roleDetails: ROLE_MAP.principal,
});

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<ERPRole>("principal");

  useEffect(() => {
    const saved = localStorage.getItem("campus_erp_active_role") as ERPRole;
    if (saved && ROLE_MAP[saved]) {
      setRole(saved);
    }
  }, []);

  const changeRole = (newRole: ERPRole) => {
    setRole(newRole);
    localStorage.setItem("campus_erp_active_role", newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole: changeRole, roleDetails: ROLE_MAP[role] }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
