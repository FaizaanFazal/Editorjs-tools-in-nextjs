import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest ) {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");
    console.log("this url",url)
    try {
        const response = await fetch(url as string);
        console.log(response)
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
        image = iconLinkMatch ? url+iconLinkMatch[1] : 'image not found';
      }
      console.log("title", title )
      console.log("des",  description )
      console.log("image", image )
    //   return Response.json({ title, description, image })
      const data={ title, description, image}
      return NextResponse.json({ success: true, meta: data, link: url });
      } catch (error: any) {
        return NextResponse.json({ success: false, error: "Couldn't fetch the link data" }, { status: 500 });
      }

 
};
