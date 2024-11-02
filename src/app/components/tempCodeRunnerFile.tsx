                                        <HStack spacing={1}>
                                            <Button
                                                variant={"ghost"}
                                                padding={"5px 10px"}
                                                margin={"0px"}
                                                h={"fit-content"}
                                                onClick={() =>
                                                    mutateAsyncLike.mutate(
                                                        thread.id
                                                    )
                                                }
                                                fontWeight={"normal"}
                                                fontSize={"14px"}
                                                color={fontColor}
                                                gap={"5px"}
                                            >
                                                {thread.isLiked ? (
                                                    <myIcons.HiHeart
                                                        fontSize={"22px"}
                                                        color={"#f87171"}
                                                    />
                                                ) : (
                                                    <myIcons.HiOutlineHeart
                                                        fontSize={"22px"}
                                                        color={fontColor}
                                                    />
                                                )}
                                                <Text>
                                                    {thread._count.like}
                                                </Text>
                                            </Button>
                                        </HStack>