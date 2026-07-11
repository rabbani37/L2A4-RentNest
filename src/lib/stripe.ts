import Stripe from "stripe";
import configIndex from "../config/config.index";

export const stripe = new Stripe(configIndex.stripe_secret_key!);