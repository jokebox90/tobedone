<?php

namespace App\Service;

use App\Entity\Author;
use App\Entity\Task;
use App\Repository\TaskRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class TaskService
{
    private JsonEncoder $encoder;
    private ObjectNormalizer $normalizer;
    private Serializer $serializer;
    private TaskRepository $repository;

    public function __construct(ManagerRegistry $doctrine) {
        $this->repository = $doctrine->getRepository( Task::class );
        $this->encoder = new JsonEncoder();
        $defaultContext = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                if ( gettype( $object ) ==  Author::class ) {
                    return $object->getUsername();
                }
                if ( gettype( $object ) ==  Task::class ) {
                    return $object->getTitle();
                }
            },
        ];
        $this->normalizer = new ObjectNormalizer(null, null, null, null, null, null, $defaultContext);
        $this->serializer = new Serializer([$this->normalizer], [$this->encoder]);
    }

    public function getAllTasksForAuthor(Author $author ) {
        return $this->repository->findByAuthor( $author );
    }

    public function encodeTaskToJson(array $tasks) {
        return $this->serializer->serialize($tasks, 'json');
    }
}