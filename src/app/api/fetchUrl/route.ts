import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest ) {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");
    try {
        const response = await fetch(url as string);

        if (response.status!==200) {
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
    //   return Response.json({ title, description, image })
      const data={ title, description, image:{"url":image} ,url}
      return NextResponse.json({ success: true, meta: data, link: url });
      } catch (error: any) {
        return NextResponse.json({ success: false, error: "Couldn't fetch the link data" }, { status: 500 });
      }

};
