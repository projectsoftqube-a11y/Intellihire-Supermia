/**
 * Custom plan (enterprise) sales inquiry.
 *
 * Submitted from the pricing section's "Contact Sales" form. The endpoint is
 * public and needs no credentials, so the request is made from the browser.
 * The base URL is exposed via `NEXT_PUBLIC_API_BASE_URL`; it is only an origin,
 * not a secret.
 */

export type CustomPlanInquiryPayload = {
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  phone_number?: string | null;
  country_code?: string;
  industry?: string | null;
  inquiry_type?: string;
  message?: string | null;
  plan_id?: string | null;
  company_id?: string | null;
  estimated_active_job_posts?: number | null;
  estimated_candidate_profiles?: number | null;
  estimated_ai_interview_min?: number | null;
  estimated_user_seats?: number | null;
};

export type CustomPlanInquiryResponseData = {
  inquiry_id: string;
  status: string;
  admin_notified: boolean;
  user_notified: boolean;
  recipient_admin_email: string;
  submitted_at: string;
};

export type ApiResponse<T> = {
  data: T | null;
  message: string;
  status: 0 | 1;
};

/** Thrown when the submission does not succeed, carrying a display-safe message. */
export class InquiryError extends Error {}

const GENERIC_ERROR =
  "Something went wrong. Please try again, or email hello@supermia.ai.";

/** Abort a submission that has not completed in this many ms. */
const REQUEST_TIMEOUT_MS = 15000;

/** Longest message we will show from the server, to keep the UI predictable. */
const MAX_SERVER_MESSAGE = 300;

/**
 * Build the inquiry URL from the public API base, rejecting anything that is
 * not a well-formed http(s) origin.
 */
function buildEndpoint(): string | null {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!base) return null;

  try {
    const url = new URL(base);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return new URL(
      "/api/v1/web/billing/custom-plan-inquiry",
      url.origin,
    ).toString();
  } catch {
    return null;
  }
}

/** Keep a server-supplied message short and free of control characters. */
function safeMessage(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, MAX_SERVER_MESSAGE);
}

/**
 * Submit a custom plan inquiry.
 *
 * Resolves with the created inquiry on success, and rejects with an
 * `InquiryError` carrying a message suitable for display otherwise.
 */
export async function submitCustomPlanInquiry(
  payload: CustomPlanInquiryPayload,
  signal?: AbortSignal,
): Promise<CustomPlanInquiryResponseData | null> {
  const endpoint = buildEndpoint();
  if (!endpoint) throw new InquiryError(GENERIC_ERROR);

  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "error",
      signal: signal ?? AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    // Re-throw a deliberate cancellation so the caller can ignore it.
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new InquiryError(
      "Network error. Please check your connection and try again.",
    );
  }

  let json: ApiResponse<CustomPlanInquiryResponseData> | null = null;
  try {
    json = (await res.json()) as ApiResponse<CustomPlanInquiryResponseData>;
  } catch {
    json = null;
  }

  if (res.ok && json?.status === 1) return json.data ?? null;

  // 422 and 400 carry a useful validation message; 500 does not.
  const serverMessage = safeMessage(json?.message);
  const useServerMessage =
    (res.status === 422 || res.status === 400) && serverMessage.length > 0;

  throw new InquiryError(useServerMessage ? serverMessage : GENERIC_ERROR);
}
