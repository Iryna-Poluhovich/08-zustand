"use client"
import "client-only"

import { useLinkStatus } from "next/link"
import { Loading } from "notiflix"

export default function LoadingIndicator() {
	const { pending } = useLinkStatus()
	if (typeof window !== "undefined") {
		if (pending) Loading.hourglass()
		else Loading.remove()
	}
	return null
}