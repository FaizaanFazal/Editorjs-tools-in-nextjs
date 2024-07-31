"use server";

export async function fetchUrl(url:string) {
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
    console.log("1wst",imageMetaMatch)
    if (imageMetaMatch) {
      image = imageMetaMatch[1];
      console.log("image",image)
    } else {
      // Fallback to link tag with rel="icon"
      const iconLinkRegex = /<link\b[^>]*\brel\s*=\s*['"]icon['"][^>]*\bhref\s*=\s*['"]([^'"]*)['"][^>]*>/i;
      const iconLinkMatch = html.match(iconLinkRegex);
      if (iconLinkMatch) {
        let hrefValue = iconLinkMatch[1];
        // Check if hrefValue starts with "http" or "https"
        if (!/^https?:\/\//i.test(hrefValue)) {
          hrefValue = url+iconLinkMatch[1]
        }
        image = hrefValue;
      } else {
        image = 'image not found';
      }
    }

     return({ title, description, image })
    } catch (error: any) {
      return({ title:"Title Not found",description:"description not found",image:"image no found" });
    }
  }