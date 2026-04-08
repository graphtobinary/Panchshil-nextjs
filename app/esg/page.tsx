import { EsgPageClient } from "@/components/EsgPage";
import {
  EsgAccordionItem,
  EsgPageData,
  EsgRecognitionSlide,
  EsgReportItem,
  emptyEsgAccordion,
  emptyEsgBeyondTheBuild,
  emptyEsgPeopleCommunities,
  emptyEsgRecognitionsCertificates,
  emptyEsgReports,
  emptyEsgSteeringCommittee,
  esgBeyondTheBuildDecorDefaults,
} from "./esg.data";
import {
  getAuthToken,
  getBanner,
  getEsgAwards,
  getEsgAwardsAPI,
  getEsgCommunities,
  getEsgCommunitiesAPI,
  getEsgInitiatives,
  getEsgInitiativesAPI,
  getEsgMilestones,
  getEsgMilestonesAPI,
  getEsgMilestonesIntro,
  getEsgMilestonesIntroAPI,
  getEsgPolicies,
  getEsgPoliciesAPI,
  getEsgReports,
  getEsgReportsAPI,
  getEsgReportsIntro,
  getEsgReportsIntroAPI,
} from "@/api/CMS.api";
import {
  AuthTokenResponse,
  BannersProps,
  EsgAwardApiItem,
  EsgCommunityApiItem,
  EsgInitiativeApiItem,
  EsgMilestoneApiItem,
  EsgMilestonesIntroApiResponse,
  EsgPolicyApiItem,
  EsgReportApiItem,
  EsgReportsIntroApiResponse,
} from "@/interfaces";

const toAbsoluteAssetUrl = (url: string | undefined): string => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT || "";
  if (!baseUrl) {
    return url;
  }

  return `${baseUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
};

function unwrapSuccessData(raw: unknown): unknown | null {
  const w = raw as { success?: boolean; data?: unknown };
  return w?.success && w.data !== undefined ? w.data : null;
}

function mapInitiatives(
  items: EsgInitiativeApiItem[] | null | undefined
): typeof emptyEsgAccordion {
  if (!items?.length) return emptyEsgAccordion;

  const mapped: EsgAccordionItem[] = [];
  items.forEach((row, i) => {
    const title = row.iniatiative_name?.trim() ?? "";
    const imageSrc = toAbsoluteAssetUrl(row.iniatiative_image);
    if (!imageSrc) return;
    mapped.push({
      id: i + 1,
      title,
      description: row.iniatiative_description ?? "",
      imageSrc,
      imageAlt: title || "ESG initiative",
    });
  });

  if (mapped.length === 0) return emptyEsgAccordion;

  return {
    heading: "",
    title: "",
    description: "",
    defaultOpen: mapped[0].id,
    items: mapped,
  };
}

function mapCommunities(
  items: EsgCommunityApiItem[] | null | undefined
): typeof emptyEsgPeopleCommunities {
  if (!items?.length) return emptyEsgPeopleCommunities;

  const tabs = items
    .map((row) => {
      const label = row.community_name?.trim() ?? "";
      const imageSrc = toAbsoluteAssetUrl(row.community_image);
      if (!label || !imageSrc) return null;
      return {
        tabLabel: label.toUpperCase(),
        slides: [
          {
            description: row.community_description ?? "",
            imageSrc,
            imageAlt: label,
          },
        ],
      };
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);

  if (tabs.length === 0) return emptyEsgPeopleCommunities;

  return {
    heading: "",
    title: "",
    tabs,
  };
}

function mapPolicies(
  items: EsgPolicyApiItem[] | null | undefined
): typeof emptyEsgSteeringCommittee {
  if (!items?.length) return emptyEsgSteeringCommittee;

  const cards = items
    .map((row) => {
      const title = row.policy_name ?? "";
      const imageSrc = toAbsoluteAssetUrl(row.policy_image);
      return {
        title,
        description: row.policy_description ?? "",
        imageSrc,
        imageAlt: title || "Policy",
      };
    })
    .filter((c) => c.imageSrc.length > 0);

  if (cards.length === 0) return emptyEsgSteeringCommittee;

  return {
    heading: "",
    title: "",
    cards,
  };
}

function mapBeyondTheBuild(
  intro: EsgMilestonesIntroApiResponse | null | undefined,
  milestones: EsgMilestoneApiItem[] | null | undefined
): typeof emptyEsgBeyondTheBuild {
  const title = intro?.intro_heading?.trim() ?? "";
  const description = intro?.intro_caption?.trim() ?? "";
  const stats = (milestones ?? [])
    .map((m) => ({
      value: (m.milestone_count ?? "").trim(),
      label: (m.milestone_description ?? "").trim(),
    }))
    .filter((s) => s.value.length > 0 || s.label.length > 0);

  if (stats.length === 0 && !title && !description) {
    return emptyEsgBeyondTheBuild;
  }

  return {
    title,
    description,
    stats,
    ...esgBeyondTheBuildDecorDefaults,
  };
}

function mapAwards(
  items: EsgAwardApiItem[] | null | undefined
): typeof emptyEsgRecognitionsCertificates {
  if (!items?.length) return emptyEsgRecognitionsCertificates;

  const slides: EsgRecognitionSlide[] = [];

  items.forEach((row) => {
    const imageSrc = toAbsoluteAssetUrl(row.esg_award_banner_image);
    if (!imageSrc) return;
    const title = row.esg_property_name?.trim() ?? "";
    const description = row.esg_award_description ?? "";
    const stats = (row.esg_award_achievements ?? []).filter((s): s is string =>
      Boolean(s && String(s).trim())
    );
    const sdgImages =
      row.esg_award_carbon_credits
        ?.map((c) => toAbsoluteAssetUrl(c.esg_award_carbon_credit_image))
        .filter((src) => src.length > 0) ?? [];

    slides.push({
      imageSrc,
      title,
      description,
      stats,
      sdgImages,
    });
  });

  if (slides.length === 0) return emptyEsgRecognitionsCertificates;

  return {
    heading: "",
    title: "",
    slides,
  };
}

function mapReports(
  intro: EsgReportsIntroApiResponse | null | undefined,
  items: EsgReportApiItem[] | null | undefined
): typeof emptyEsgReports {
  const heading = intro?.reports_heading?.trim() ?? "";
  const title = intro?.reports_caption?.trim() ?? "";

  const reports: EsgReportItem[] = [];
  (items ?? []).forEach((row) => {
    const imageSrc = toAbsoluteAssetUrl(row.report_thumbnail);
    const href = toAbsoluteAssetUrl(row.report_pdf);
    if (!imageSrc || !href) return;
    reports.push({
      imageSrc,
      subtitle: row.report_name?.trim() ?? "",
      title: row.report_year?.trim() ?? "",
      href,
    });
  });

  if (reports.length === 0 && !heading && !title) {
    return emptyEsgReports;
  }

  return {
    heading,
    title,
    reports,
  };
}

function parseMilestonesIntro(
  data: unknown
): EsgMilestonesIntroApiResponse | null {
  if (typeof data !== "object" || data === null) return null;
  return data as EsgMilestonesIntroApiResponse;
}

function parseReportsIntro(data: unknown): EsgReportsIntroApiResponse | null {
  if (typeof data !== "object" || data === null) return null;
  return data as EsgReportsIntroApiResponse;
}

export default async function EsgPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  let banner: BannersProps | null = null;
  let initiatives: EsgInitiativeApiItem[] | null = null;
  let communities: EsgCommunityApiItem[] | null = null;
  let policies: EsgPolicyApiItem[] | null = null;
  let milestonesIntro: EsgMilestonesIntroApiResponse | null = null;
  let milestones: EsgMilestoneApiItem[] | null = null;
  let awards: EsgAwardApiItem[] | null = null;
  let reportsIntro: EsgReportsIntroApiResponse | null = null;
  let reports: EsgReportApiItem[] | null = null;

  if (siteUrl) {
    try {
      const [
        bannerRes,
        initiativesRes,
        communitiesRes,
        policiesRes,
        milestonesIntroRes,
        milestonesRes,
        awardsRes,
        reportsIntroRes,
        reportsRes,
      ] = await Promise.all([
        // Banner is fetched directly from CMS like Home (no /api proxy).
        // We keep it inside this parallel section for consistent timing.
        (async () => {
          try {
            const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
            const token =
              tokenResponse?.token && typeof tokenResponse.token === "string"
                ? tokenResponse.token
                : null;
            return token
              ? ((await getBanner(token, "ESG")) as BannersProps)
              : null;
          } catch {
            return null;
          }
        })(),
        getEsgInitiativesAPI(siteUrl),
        getEsgCommunitiesAPI(siteUrl),
        getEsgPoliciesAPI(siteUrl),
        getEsgMilestonesIntroAPI(siteUrl),
        getEsgMilestonesAPI(siteUrl),
        getEsgAwardsAPI(siteUrl),
        getEsgReportsIntroAPI(siteUrl),
        getEsgReportsAPI(siteUrl),
      ]);

      if (bannerRes && typeof bannerRes === "object") {
        banner = bannerRes as BannersProps;
      }

      const i1 = unwrapSuccessData(initiativesRes);
      if (Array.isArray(i1)) initiatives = i1 as EsgInitiativeApiItem[];

      const i2 = unwrapSuccessData(communitiesRes);
      if (Array.isArray(i2)) communities = i2 as EsgCommunityApiItem[];

      const i3 = unwrapSuccessData(policiesRes);
      if (Array.isArray(i3)) policies = i3 as EsgPolicyApiItem[];

      milestonesIntro = parseMilestonesIntro(
        unwrapSuccessData(milestonesIntroRes)
      );

      const i5 = unwrapSuccessData(milestonesRes);
      if (Array.isArray(i5)) milestones = i5 as EsgMilestoneApiItem[];

      const i6 = unwrapSuccessData(awardsRes);
      if (Array.isArray(i6)) awards = i6 as EsgAwardApiItem[];

      reportsIntro = parseReportsIntro(unwrapSuccessData(reportsIntroRes));

      const i8 = unwrapSuccessData(reportsRes);
      if (Array.isArray(i8)) reports = i8 as EsgReportApiItem[];
    } catch (error) {
      console.error("Error fetching ESG from proxy API:", error);
    }
  }

  const needsDirect =
    !banner ||
    !initiatives?.length ||
    !communities?.length ||
    !policies?.length ||
    !milestonesIntro ||
    !milestones?.length ||
    !awards?.length ||
    !reportsIntro ||
    !reports?.length;

  let t: string | null = null;
  if (needsDirect) {
    try {
      const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
      if (tokenResponse?.token && typeof tokenResponse.token === "string") {
        t = tokenResponse.token;
      }
    } catch (error) {
      console.error("Error fetching auth token for ESG:", error);
    }
  }

  if (!banner && t) {
    try {
      const raw = (await getBanner(t, "ESG")) as BannersProps;
      if (raw && typeof raw === "object") {
        banner = raw;
      }
    } catch (e) {
      console.error("Error fetching ESG banner:", e);
    }
  }

  if (!initiatives?.length && t) {
    try {
      const raw = await getEsgInitiatives(t);
      if (Array.isArray(raw) && raw.length > 0) {
        initiatives = raw as EsgInitiativeApiItem[];
      }
    } catch (e) {
      console.error("Error fetching ESG initiatives:", e);
    }
  }

  if (!communities?.length && t) {
    try {
      const raw = await getEsgCommunities(t);
      if (Array.isArray(raw) && raw.length > 0) {
        communities = raw as EsgCommunityApiItem[];
      }
    } catch (e) {
      console.error("Error fetching ESG communities:", e);
    }
  }

  if (!policies?.length && t) {
    try {
      const raw = await getEsgPolicies(t);
      if (Array.isArray(raw) && raw.length > 0) {
        policies = raw as EsgPolicyApiItem[];
      }
    } catch (e) {
      console.error("Error fetching ESG policies:", e);
    }
  }

  if (!milestonesIntro && t) {
    try {
      const raw = await getEsgMilestonesIntro(t);
      milestonesIntro = parseMilestonesIntro(raw);
    } catch (e) {
      console.error("Error fetching ESG milestones intro:", e);
    }
  }

  if (!milestones?.length && t) {
    try {
      const raw = await getEsgMilestones(t);
      if (Array.isArray(raw) && raw.length > 0) {
        milestones = raw as EsgMilestoneApiItem[];
      }
    } catch (e) {
      console.error("Error fetching ESG milestones:", e);
    }
  }

  if (!awards?.length && t) {
    try {
      const raw = await getEsgAwards(t);
      if (Array.isArray(raw) && raw.length > 0) {
        awards = raw as EsgAwardApiItem[];
      }
    } catch (e) {
      console.error("Error fetching ESG awards:", e);
    }
  }

  if (!reportsIntro && t) {
    try {
      const raw = await getEsgReportsIntro(t);
      reportsIntro = parseReportsIntro(raw);
    } catch (e) {
      console.error("Error fetching ESG reports intro:", e);
    }
  }

  if (!reports?.length && t) {
    try {
      const raw = await getEsgReports(t);
      if (Array.isArray(raw) && raw.length > 0) {
        reports = raw as EsgReportApiItem[];
      }
    } catch (e) {
      console.error("Error fetching ESG reports:", e);
    }
  }

  const data: EsgPageData = {
    hero: {
      title: banner?.banner_image_caption ?? "",
      description: banner?.banner_image_description ?? "",
      imageSrc: toAbsoluteAssetUrl(banner?.banner_image),
    },
    accordion: mapInitiatives(initiatives),
    peopleCommunities: mapCommunities(communities),
    steeringCommittee: mapPolicies(policies),
    beyondTheBuild: mapBeyondTheBuild(milestonesIntro, milestones),
    recognitionsCertificates: mapAwards(awards),
    reports: mapReports(reportsIntro, reports),
  };

  return <EsgPageClient data={data} />;
}
