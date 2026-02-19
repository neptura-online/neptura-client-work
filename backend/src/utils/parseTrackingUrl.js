import { TrackingField } from "../modules/TrackingField.js";

export const parseTrackingUrl = async (url) => {
  try {
    const parsedUrl = new URL(url);
    const params = parsedUrl.searchParams;

    const allowed = await TrackingField.find({
      isActive: true,
    });

    const tracking = {};

    for (const f of allowed) {
      const val = params.get(f.key);
      if (val) tracking[f.key] = val;
    }

    return tracking;
  } catch {
    return {};
  }
};
