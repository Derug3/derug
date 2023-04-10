import { IUserData } from "../interface/user.interface";
import { get } from "./request.api";
import { PUBKEY, TWITTER_AUTH } from "./url.api";

export const authorizeTwitter = async (slug: string, pubkey: string) => {
  try {
    const data = await get(`${TWITTER_AUTH}/${slug + "!" + pubkey}`);
    window.open(data.url);
  } catch (error: any) {
    console.log(error);
  }
};

export const getUserTwitterData = (pubkey: string): Promise<IUserData> => {
  return get(TWITTER_AUTH + PUBKEY + "/" + pubkey);
};
