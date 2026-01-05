import * as React from "react";
import type { RouteObject } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const route: RouteObject = {
	path: "auth",
	element: <Outlet />,
	children: [
		{
			path: "signin",
			lazy: async () => {
				const { Page } = await import("@/pages/auth/signin");
				return { Component: Page };
			},
		},
		{
			path: "signup",
			lazy: async () => {
				const { Page } = await import("@/pages/auth/signup");
				return { Component: Page };
			},
		},
	],
};
