"use server";

import type { NextApiRequest, NextApiResponse } from 'next';


export async function fetchUrl(url:string) {
  console.log("serrver action------------------------------------")
    if (!url || typeof url !== 'string') {
      return ("error");
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log('Failed to fetch data');
      }
      const html = await response.text();

    // Extract title
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : 'Title Not found';

    // Extract description
    const descriptionMatch = html.match(/<meta\s+[^>]*name\s*=\s*['"]description['"][^>]*content\s*=\s*['"]([^'"]*)['"][^>]*>/i);

    const description = descriptionMatch ? descriptionMatch[1] : "description not found";

    // Extract image
    let image = '';
    const imageMetaRegex = /<meta\s+property\s*=\s*['"]og:image['"][^>]*content\s*=\s*['"]([^'"]*)['"][^>]*>/i;
    const imageMetaMatch = html.match(imageMetaRegex);
    if (imageMetaMatch) {
      image = imageMetaMatch[1];
    } else {
      // Fallback to link tag with rel="icon"
      const iconLinkRegex = /<link\b[^>]*\brel\s*=\s*['"]icon['"][^>]*\bhref\s*=\s*['"]([^'"]*)['"][^>]*>/i;
      const iconLinkMatch = html.match(iconLinkRegex);
      image = iconLinkMatch ? url+iconLinkMatch[1] : 'image not found';
    }
    console.log("title", title )
    console.log("des",  description )
    console.log("image", image )
     return({ title, description, image })
    } catch (error: any) {
      return({ title:"Title Not found",description:"description not found",image:"image no found" });
    }
  }