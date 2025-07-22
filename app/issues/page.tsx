"use client"
import React from 'react';
import {Button, Link} from "@radix-ui/themes";
import NextLink from "next/link";


const IssuePage=()=>{
    return(
        <div>
      <NextLink href="/issues/new" passHref>
        <Button asChild>
          <a>New Issue</a>
        </Button>
      </NextLink>
    </div>
    )
}
export default IssuePage;

{/* <div>
      <NextLink href="/issues/new" passHref>
        <Button asChild>
          <a>New Issue</a>
        </Button>
      </NextLink>
    </div> */}