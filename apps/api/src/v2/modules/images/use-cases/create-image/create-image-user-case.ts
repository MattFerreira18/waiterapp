import AppError from "@/errors/app-error";
import Either, { Left, Right } from "@/errors/either";
import type { HttpBodyResponse, MultipartFile } from "@/infra/http/interfaces";

import Image from "../../entities/image";
import type { IImagesRepository } from "../../infra/repositories/interfaces";
import ImageTransformJob from "../../jobs/image-transform";
import imagePresentation, {
  IImagePresentation,
} from "../../presentations/image-presentation";

export interface ICreateImageUseCaseInput {
  file: MultipartFile | undefined;
}

type CreateImageUseCaseOutput = HttpBodyResponse<{
  image: IImagePresentation;
}>;

class CreateImageUseCase {
  constructor(
    private readonly imagesRepository: IImagesRepository,
    private readonly imageTransformJob: ImageTransformJob
  ) {}

  async execute({
    file,
  }: ICreateImageUseCaseInput): Promise<
    Either<AppError, CreateImageUseCaseOutput>
  > {
    if (!file) {
      return Left.commit(
        new AppError("bad_request", "form-data must be filled")
      );
    }

    const { mimetype, filename, pathname } = file;

    const image = new Image({
      format: mimetype,
      filename,
      pathname,
    });

    await this.imagesRepository.create(image);
    const jobIsRegistered = await this.imageTransformJob.commit({
      filename: image.filename,
      format: image.format,
      id: image._id,
      pathname: image.pathname as string,
    });

    if (!jobIsRegistered) {
      return Left.commit(new AppError("internal", "an unknown error occur"));
    }

    return Right.commit({
      _self: null,
      data: {
        image: imagePresentation(image),
      },
    });
  }
}

export default CreateImageUseCase;
